using System;
using System.Collections.Generic;
using MeetApp.API.Models;

namespace MeetApp.API.DTOs
{
    public class UserForDetailsDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age {get;set;}
        public string KnownAs {get;set;}
        public DateTime CreateTime {get;set;}
        public DateTime LastActive {get;set;}
        public string Intoduction {get;set;}
        public string LookingFor {get;set;}
        public string Interests {get;set;}
        public string City {get;set;}
        public string Country {get;set;}
        public string PhotoUrl {get;set;}
        public ICollection<PhotoForDetailsDto> Photos {get;set;}
    }
}