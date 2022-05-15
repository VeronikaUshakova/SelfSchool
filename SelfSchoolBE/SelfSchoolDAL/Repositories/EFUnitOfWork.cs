using System;
using SelfSchoolDAL.Interfaces;
using SelfSchoolDAL.DataContext;

namespace SelfSchoolDAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private DatabaseContext context;
        private AnswerRepository answerRepository;
        private ClassSchoolRepository classSchoolRepository;
        private FamilyRepository familyRepository;
        private LessonRepository lessonRepository;
        private MaterialRepository materialRepository;
        private ParentRepository parentRepository;
        private PupilRepository pupilRepository;
        private TaskLessonRepository taskLessonRepository;
        private TeacherRepository teacherRepository;
        private AdminRepository adminRepository;
        public EFUnitOfWork()
        {
            context = new DatabaseContext(DatabaseContext.ops.dbOptions);
        }

        public AnswerInterface Answers
        {
            get
            {
                if (answerRepository == null)
                {
                    answerRepository = new AnswerRepository(context);
                }
                return answerRepository;
            }
        }

        public ClassSchoolInterface ClassSchools
        {
            get
            {
                if (classSchoolRepository == null)
                {
                    classSchoolRepository = new ClassSchoolRepository(context);
                }
                return classSchoolRepository;
            }
        }

        public FamilyInterface Families
        {
            get
            {
                if (familyRepository == null)
                {
                    familyRepository = new FamilyRepository(context);
                }
                return familyRepository;
            }
        }

        public LessonInterface Lessons
        {
            get
            {
                if (lessonRepository == null)
                {
                    lessonRepository = new LessonRepository(context);
                }
                return lessonRepository;
            }
        }
        public MaterialInterface Materials
        {
            get
            {
                if (materialRepository == null)
                {
                    materialRepository = new MaterialRepository(context);
                }
                return materialRepository;
            }
        }

        public ParentInterface Parents
        {
            get
            {
                if (parentRepository == null)
                {
                    parentRepository = new ParentRepository(context);
                }
                return parentRepository;
            }
        }

        public PupilInterface Pupils
        {
            get
            {
                if (pupilRepository == null)
                {
                    pupilRepository = new PupilRepository(context);
                }
                return pupilRepository;
            }
        }

        public TaskLessonInterface TaskLessons
        {
            get
            {
                if (taskLessonRepository == null)
                {
                    taskLessonRepository = new TaskLessonRepository(context);
                }
                return taskLessonRepository;
            }
        }

        public TeacherInterface Teachers
        {
            get
            {
                if (teacherRepository == null)
                {
                    teacherRepository = new TeacherRepository(context);
                }
                return teacherRepository;
            }
        }

        public AdminInterface Admins
        {
            get
            {
                if (adminRepository == null)
                {
                    adminRepository = new AdminRepository(context);
                }
                return adminRepository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
