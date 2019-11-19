using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotnetCore.Model;
using Microsoft.EntityFrameworkCore;

namespace DotnetCore.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) 
        {
            _context = context;
        }

        public async Task<Applicant> AddApplicant(Applicant applicant)
        {
            await _context.Applicant.AddAsync(applicant);
            await _context.SaveChangesAsync();
            return applicant;
        }

        public Task<User> AddUser(User user)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Applicant> FetchApplicant(int applicantID)
        {
            return await _context.Applicant.SingleOrDefaultAsync(x => x.ApplicantID == applicantID);
        }

        public async Task<IEnumerable<dynamic>> FetchApplicants()
        {
            return await _context.Applicant.Include(x => x.User).Select(
                x => new {
                    ApplicantID = x.ApplicantID,
                    ApplicantName = x.FirstName + ' ' + x.LastName,
                    CreatedBy = x.User.Username,
                    CreatorID = x.UserID,
                    DateCreated = x.CreatedAt.ToString("dd-MM-yyyy"),
                }
            ).ToListAsync();
        }

        public Task<User> UpdateUser(User user)
        {
            throw new System.NotImplementedException();
        }
    }
}