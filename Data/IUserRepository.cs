using System.Collections.Generic;
using System.Threading.Tasks;
using DotnetCore.Model;

namespace DotnetCore.Data
{
    public interface IUserRepository
    {
       Task<User> AddUser(User user);
       Task<User> UpdateUser(User user);
       Task<Applicant> AddApplicant(Applicant applicant);
       Task<IEnumerable<dynamic>> FetchApplicants();
       Task<Applicant> FetchApplicant(int applicantID);
    }
}