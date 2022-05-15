using SelfSchoolDAL.DataContext;
using SelfSchoolDAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SelfSchoolDAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        AnswerInterface Answers { get; }
        ClassSchoolInterface ClassSchools { get; }
        FamilyInterface Families { get; }

        LessonInterface Lessons { get; }

        MaterialInterface Materials { get; }

        ParentInterface Parents { get; }
        PupilInterface Pupils { get; }

        TaskLessonInterface TaskLessons { get; }
        TeacherInterface Teachers { get; }
        AdminInterface Admins { get; }
    }
}
