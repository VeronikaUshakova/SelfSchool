using Microsoft.EntityFrameworkCore;
using SelfSchoolBLL.Infrastructure;
using SelfSchoolDAL.Entities;
using SelfSchoolDAL.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SelfSchoolBLL.Services
{
    public class AnswerService
    {
        EFUnitOfWork Database = new EFUnitOfWork();

        public async Task<List<Answer>> GetALLAnswers()
        {
            List<Answer> answers = await Database.Answers.GetAll();

            for (int i = answers.Count - 1; i >= 0; i--) 
            {
                var pupil = Database.Pupils.Get(answers[i].idPupil);
                var task = Database.TaskLessons.Get(answers[i].idTask);
                var material = Database.Materials.Get(answers[i].idMaterial);

                if (pupil == null && task == null && material == null) 
                {
                    DeleteAnswer(answers[i].idAnswer);
                }
            }

            answers = await Database.Answers.GetAll();
            return answers;
        }

        public Answer GetAnswer(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var answer = Database.Answers.Get(id.Value);
            if (answer == null)
                throw new ValidationException("Answer not found");
            return answer;
        }
        List<Answer> FindAnswer(Func<Answer, Boolean> predicate)
        {
            return Database.Answers.Find(predicate);
        }
        public void CreateAnswer(Answer answer)
        {
            if (answer == null)
            {
                throw new ValidationException("Invalid data");
            }
            Database.Answers.Create(answer);
        }
        public void UpdateAnswer(Answer answer)
        {
            if (answer == null)
            {
                throw new ValidationException("Invalid data");
            }

            var currentAnswer = GetAnswer(answer.idAnswer);

            if (currentAnswer.idMaterial == answer.idMaterial &&
                currentAnswer.idPupil == answer.idPupil &&
                currentAnswer.idTask == answer.idTask &&
                currentAnswer.gradeAnswer == answer.gradeAnswer &&
                currentAnswer.fastAnswer == answer.fastAnswer)
            {
                throw new ValidationException("You didn't change anything");
            }

            Database.Answers.Update(answer);
        }
        public void DeleteAnswer(int? id)
        {
            if (id == null)
                throw new ValidationException("Id not found");
            var answer = Database.Answers.Get(id.Value);
            if (answer == null)
                throw new ValidationException("Answer not found");
            Database.Answers.Delete(id.Value);
        }
    }
}
