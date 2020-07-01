using System.Threading.Tasks;
using MeetApp.API.Models;

namespace MeetApp.API.Data
{
    public interface IAuthorisationRepo
    {
        Task<User> Login (string username, string password);
        Task<User> Register (User user, string password);
        Task<bool> UserExists (string username);

    }
}