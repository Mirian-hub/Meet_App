using System;
using System.Threading.Tasks;
using MeetApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MeetApp.API.Data
{
    public class AuthorisationRepo : IAuthorisationRepo
    {
        private DataContext _context;
        public AuthorisationRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user =await _context.Users.FirstOrDefaultAsync(u =>u.Username == username);
            if(user == null)
               return null;
            
            if(!VarifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
             return null;

            return user;

        }

        private bool VarifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt) ) 
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i=0; i<computedHash.Length; i++) {
                    if(computedHash[i] != passwordHash[i])
                    return false;
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswardHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswardHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
          using (var hmac = new  System.Security.Cryptography.HMACSHA512()) {
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                passwordSalt = hmac.Key;
          }
          
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(u => u.Username == username))
            return true;
            return false;
        }
    }
}