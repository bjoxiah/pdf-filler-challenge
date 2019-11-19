using System;

namespace DotnetCore.Model
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime CreatedAt { get; set; }
        public User() {
            CreatedAt = DateTime.Now;
        }
    }
}