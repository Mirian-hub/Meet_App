using System;
using System.Collections.Generic;

namespace MeetApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth {get;set;}
        public string KnownAs {get;set;}
        public DateTime CreateTime {get;set;}
        public DateTime LastActive {get;set;}
        public string Intoduction {get;set;}
        public string LookingFor {get;set;}
        public string Interests {get;set;}
        public string City {get;set;}
        public string Country {get;set;}
        public ICollection<Photo> Photos {get;set;}
    }
}