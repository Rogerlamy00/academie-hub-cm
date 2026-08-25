-- 1. Teacher profile exposure
CREATE OR REPLACE FUNCTION public.can_view_teacher(_user_id uuid, _teacher_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT
    public.is_admin(_user_id)
    OR EXISTS (SELECT 1 FROM public.teacher_profiles tp WHERE tp.id = _teacher_id AND tp.user_id = _user_id)
    OR EXISTS (
      SELECT 1 FROM public.teacher_assignments ta
      JOIN public.enrollments e ON e.class_id = ta.class_id
      JOIN public.student_profiles sp ON sp.id = e.student_id
      WHERE ta.teacher_id = _teacher_id AND sp.user_id = _user_id
    )
    OR EXISTS (
      SELECT 1 FROM public.teacher_assignments ta
      JOIN public.enrollments e ON e.class_id = ta.class_id
      JOIN public.parent_students ps ON ps.student_id = e.student_id
      JOIN public.parent_profiles pp ON pp.id = ps.parent_id
      WHERE ta.teacher_id = _teacher_id AND pp.user_id = _user_id
    );
$$;

REVOKE ALL ON FUNCTION public.can_view_teacher(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_view_teacher(uuid, uuid) TO authenticated;

DROP POLICY IF EXISTS teachers_read_all ON public.teacher_profiles;
CREATE POLICY teachers_read_scoped ON public.teacher_profiles
  FOR SELECT TO authenticated
  USING (public.can_view_teacher(auth.uid(), id));

-- 2. Audit log spoofing: no direct client inserts
DROP POLICY IF EXISTS audit_logs_insert_auth ON public.audit_logs;
REVOKE INSERT, UPDATE, DELETE ON public.audit_logs FROM authenticated;
GRANT ALL ON public.audit_logs TO service_role;

-- 3. Trigger-only SECURITY DEFINER functions must not be callable by clients
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, authenticated, anon;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, authenticated, anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_teacher(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_view_student(uuid, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.teacher_has_class(uuid, uuid) FROM PUBLIC, anon;
