using System;

namespace DotnetCore.Model
{
    public class Applicant
    {
        public int ApplicantID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FormFormattedData { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; }
        public Applicant() {
            CreatedAt = DateTime.Now;
        }
    }
}