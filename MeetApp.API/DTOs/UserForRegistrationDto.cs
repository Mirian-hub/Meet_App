using System.ComponentModel.DataAnnotations;

namespace MeetApp.API.DTOs
{
    public class UserForRegistrationDto
    {
        [Required]        
        public string UserName {get;set;}
        [Required]
        [StringLength(10, MinimumLength=5, ErrorMessage = "you must specify password btw 5 and 10 characters")]
        public string Password { get; set; }
    }
}