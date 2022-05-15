using System;
using System.Collections.Generic;
using System.Text;

namespace SelfSchoolBLL.Infrastructure
{
    public class ValidationException : Exception
    {
        public ValidationException(string message) : base(message)
        {
        }
    }
}
