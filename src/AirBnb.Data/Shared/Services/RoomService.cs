using AirBnb.Core.Domain.Content;
using AirBnb.Core.Domain.Identity;
using AirBnb.Core.Models.Content;
using AirBnb.Core.SeedWorks;
using AirBnb.Core.Shared.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;


namespace AirBnb.Data.Shared.Services
{
    public class RoomService : IRoomService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        public RoomService(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }
        public async Task<Room> MapRequestToRoomAsync(CreateUpdateRoomRequest request, Guid userId)
        {
            var room = _mapper.Map<CreateUpdateRoomRequest, Room>(request);
            var roomId = Guid.NewGuid();
            var category = await _unitOfWork.RoomCategories.GetByIdAsync(request.CategoryId);
            if (category == null)
            {
                throw new Exception("Không tồn tại category ");
            }
            room.Id = roomId;
            room.CategoryName = category.Name;
            room.CategorySlug = category.Slug;
            var user = await _userManager.FindByIdAsync(userId.ToString());
            room.AuthorUserName = user.UserName;
            room.AuthorUserId = userId;
            room.AuthorName = user.UserName;
            room.DateCreated = DateTime.Now;
            return room;
        }
    }
}
