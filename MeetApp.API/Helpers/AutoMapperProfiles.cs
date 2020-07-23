using System.Linq;
using AutoMapper;
using MeetApp.API.DTOs;
using MeetApp.API.Models;

namespace MeetApp.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
             .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>src.DateOfBirth.GetAge()))
            .ForMember(dest =>dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p=>p.IsMain).Url));
            CreateMap<User, UserForDetailsDto>()
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>src.DateOfBirth.GetAge()))
            .ForMember(dest =>dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p=>p.IsMain).Url));
            CreateMap<Photo, PhotoForDetailsDto>();
            CreateMap<UserForUpdateDto, User>();
        }
    }
}