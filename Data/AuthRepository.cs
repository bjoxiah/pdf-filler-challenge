using System.Threading.Tasks;
using DotnetCore.Model;
using Microsoft.EntityFrameworkCore;

namespace DotnetCore.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context) 
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.User.SingleOrDefaultAsync(x => x.Username.ToLower().Equals(username.ToLower()));
            if (user != null)
            {   
                if (VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) 
                {
                    return user;
                }
                return null;
            }
            return null;

        }

        public Task Logout()
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if(computeHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<bool> CheckUsername(string username)
        {
            return await _context.User.AnyAsync(x => x.Username.ToLower().Equals(username.ToLower()));
        }
    }
}