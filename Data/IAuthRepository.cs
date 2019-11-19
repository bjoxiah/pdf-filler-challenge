using System.Threading.Tasks;
using DotnetCore.Model;

namespace DotnetCore.Data
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        Task<bool> CheckUsername(string username);
        Task Logout();
    }
}