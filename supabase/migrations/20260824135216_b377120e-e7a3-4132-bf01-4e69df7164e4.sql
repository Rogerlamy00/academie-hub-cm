-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('super_admin','admin','teacher','student','parent');
CREATE TYPE public.gender AS ENUM ('M','F');
CREATE TYPE public.record_status AS ENUM ('active','inactive','archived');

-- ============ UTIL ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','super_admin'));
$$;

CREATE OR REPLACE FUNCTION public.is_teacher(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'teacher');
$$;

CREATE POLICY "profiles_select_self_or_admin" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin(auth.uid()) OR public.is_teacher(auth.uid()));
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "user_roles_select_self_or_admin" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "user_roles_super_admin_manage" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

-- New user -> profile (+ first user becomes super_admin)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;

  IF NOT EXISTS (SELECT 1 FROM public.user_roles) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'super_admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data ->> 'role')::public.app_role, 'student'))
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ ACADEMIC STRUCTURE ============
CREATE TABLE public.academic_years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  academic_year_id UUID NOT NULL REFERENCES public.academic_years(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  position INT NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (academic_year_id, position)
);

CREATE TABLE public.sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID NOT NULL REFERENCES public.terms(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  position INT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (term_id, position)
);

CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  series TEXT,
  capacity INT,
  academic_year_id UUID REFERENCES public.academic_years(id) ON DELETE SET NULL,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name, academic_year_id)
);

CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  default_coefficient NUMERIC(4,2) NOT NULL DEFAULT 1,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.class_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  coefficient NUMERIC(4,2) NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (class_id, subject_id)
);

-- ============ PEOPLE ============
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  matricule TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender public.gender,
  birth_date DATE,
  birth_place TEXT,
  photo_url TEXT,
  phone TEXT,
  email TEXT,
  school TEXT,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.teacher_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  matricule TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  speciality TEXT,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.parent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  profession TEXT,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.parent_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES public.parent_profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  relationship TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parent_id, student_id)
);

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES public.academic_years(id) ON DELETE CASCADE,
  enrolled_at DATE NOT NULL DEFAULT CURRENT_DATE,
  status public.record_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, academic_year_id)
);

CREATE TABLE public.teacher_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.teacher_profiles(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  academic_year_id UUID REFERENCES public.academic_years(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (teacher_id, class_id, subject_id, academic_year_id)
);

CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============ INDEXES ============
CREATE INDEX idx_terms_year ON public.terms(academic_year_id);
CREATE INDEX idx_sequences_term ON public.sequences(term_id);
CREATE INDEX idx_classes_year ON public.classes(academic_year_id);
CREATE INDEX idx_class_subjects_class ON public.class_subjects(class_id);
CREATE INDEX idx_enrollments_class ON public.enrollments(class_id);
CREATE INDEX idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX idx_assignments_teacher ON public.teacher_assignments(teacher_id);
CREATE INDEX idx_assignments_class ON public.teacher_assignments(class_id);
CREATE INDEX idx_parent_students_parent ON public.parent_students(parent_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);
CREATE INDEX idx_students_names ON public.student_profiles(last_name, first_name);

-- ============ GRANTS + RLS ============
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['academic_years','terms','sequences','classes','subjects','class_subjects',
    'student_profiles','teacher_profiles','parent_profiles','parent_students','enrollments',
    'teacher_assignments','audit_logs']
  LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "%s_admin_all" ON public.%I FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()))', t, t);
  END LOOP;
END $$;

-- Reference data readable by all authenticated users
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['academic_years','terms','sequences','classes','subjects','class_subjects']
  LOOP
    EXECUTE format('CREATE POLICY "%s_read_all" ON public.%I FOR SELECT TO authenticated USING (true)', t, t);
  END LOOP;
END $$;

-- Helper: teacher owns class
CREATE OR REPLACE FUNCTION public.teacher_has_class(_user_id UUID, _class_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.teacher_assignments ta
    JOIN public.teacher_profiles tp ON tp.id = ta.teacher_id
    WHERE tp.user_id = _user_id AND ta.class_id = _class_id
  );
$$;

-- Helper: user can view a student
CREATE OR REPLACE FUNCTION public.can_view_student(_user_id UUID, _student_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    public.is_admin(_user_id)
    OR EXISTS (SELECT 1 FROM public.student_profiles sp WHERE sp.id = _student_id AND sp.user_id = _user_id)
    OR EXISTS (
      SELECT 1 FROM public.parent_students ps
      JOIN public.parent_profiles pp ON pp.id = ps.parent_id
      WHERE ps.student_id = _student_id AND pp.user_id = _user_id
    )
    OR EXISTS (
      SELECT 1 FROM public.enrollments e
      JOIN public.teacher_assignments ta ON ta.class_id = e.class_id
      JOIN public.teacher_profiles tp ON tp.id = ta.teacher_id
      WHERE e.student_id = _student_id AND tp.user_id = _user_id
    );
$$;

CREATE POLICY "students_read_scoped" ON public.student_profiles FOR SELECT TO authenticated
  USING (public.can_view_student(auth.uid(), id));
CREATE POLICY "enrollments_read_scoped" ON public.enrollments FOR SELECT TO authenticated
  USING (public.can_view_student(auth.uid(), student_id));
CREATE POLICY "parent_students_read_scoped" ON public.parent_students FOR SELECT TO authenticated
  USING (public.can_view_student(auth.uid(), student_id)
         OR EXISTS (SELECT 1 FROM public.parent_profiles pp WHERE pp.id = parent_id AND pp.user_id = auth.uid()));
CREATE POLICY "teachers_read_all" ON public.teacher_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "parents_read_self" ON public.parent_profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "assignments_read_scoped" ON public.teacher_assignments FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid())
         OR EXISTS (SELECT 1 FROM public.teacher_profiles tp WHERE tp.id = teacher_id AND tp.user_id = auth.uid()));
CREATE POLICY "audit_logs_insert_auth" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- ============ SEED ============
WITH y AS (
  INSERT INTO public.academic_years (label, start_date, end_date, is_current)
  VALUES ('2026/2027','2026-09-07','2027-06-30', true) RETURNING id
), t AS (
  INSERT INTO public.terms (academic_year_id, label, position)
  SELECT y.id, v.label, v.pos FROM y,
    (VALUES ('Trimestre 1',1),('Trimestre 2',2),('Trimestre 3',3)) AS v(label,pos)
  RETURNING id, position
)
INSERT INTO public.sequences (term_id, label, position, is_current)
SELECT t.id, 'Séquence ' || s.pos, s.pos, s.pos = 1
FROM t JOIN (VALUES (1,1),(1,2),(2,3),(2,4),(3,5),(3,6)) AS s(term_pos,pos) ON s.term_pos = t.position;

INSERT INTO public.subjects (name, code, default_coefficient) VALUES
  ('Mathématiques','MATH',4),('Français','FRAN',4),('Anglais','ANGL',3),
  ('Physique','PHYS',3),('Chimie','CHIM',2),('SVT','SVT',3),
  ('Histoire','HIST',2),('Géographie','GEOG',2),('Informatique','INFO',2),
  ('Philosophie','PHIL',3),('ECM','ECM',1),('EPS','EPS',1),
  ('Espagnol','ESPA',2),('Allemand','ALLE',2);

INSERT INTO public.classes (name, level, series, capacity, academic_year_id)
SELECT c.name, c.level, c.series, 40, (SELECT id FROM public.academic_years WHERE label='2026/2027')
FROM (VALUES
  ('6ème','6ème',NULL),('5ème','5ème',NULL),('4ème','4ème',NULL),('3ème','3ème',NULL),
  ('2nde A','2nde','A'),('2nde C','2nde','C'),
  ('1ère A','1ère','A'),('1ère D','1ère','D'),
  ('Tle A','Terminale','A'),('Tle D','Terminale','D')
) AS c(name,level,series);

INSERT INTO public.class_subjects (class_id, subject_id, coefficient)
SELECT cl.id, s.id, s.default_coefficient
FROM public.classes cl
CROSS JOIN public.subjects s
WHERE s.code IN ('MATH','FRAN','ANGL','HIST','GEOG','EPS')
   OR (s.code IN ('PHYS','CHIM','SVT','INFO','ECM') AND cl.series IS DISTINCT FROM 'A')
   OR (s.code IN ('PHIL','ESPA') AND cl.level IN ('1ère','Terminale'));
