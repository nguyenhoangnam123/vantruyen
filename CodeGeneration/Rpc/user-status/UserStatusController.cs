using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.BE.Entities;
using Portal.BE.Services.MUserStatus;

namespace Portal.BE.Rpc.user_status
{
    public class UserStatusRoute : Root
    {
        public const string Master = Module + "/user-status/user-status-master";
        public const string Detail = Module + "/user-status/user-status-detail";
        private const string Default = Rpc + Module + "/user-status";
        public const string Count = Default + "/count";
        public const string List = Default + "/list";
        public const string Get = Default + "/get";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string Import = Default + "/import";
        public const string Export = Default + "/export";

        public static Dictionary<string, FieldType> Filters = new Dictionary<string, FieldType>
        {
            { nameof(UserStatusFilter.Id), FieldType.ID },
            { nameof(UserStatusFilter.Code), FieldType.STRING },
            { nameof(UserStatusFilter.Name), FieldType.STRING },
        };
    }

    public class UserStatusController : RpcController
    {
        private IUserStatusService UserStatusService;

        public UserStatusController(
            IUserStatusService UserStatusService
        )
        {
            this.UserStatusService = UserStatusService;
        }

        [Route(UserStatusRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] UserStatus_UserStatusFilterDTO UserStatus_UserStatusFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            UserStatusFilter UserStatusFilter = ConvertFilterDTOToFilterEntity(UserStatus_UserStatusFilterDTO);
            int count = await UserStatusService.Count(UserStatusFilter);
            return count;
        }

        [Route(UserStatusRoute.List), HttpPost]
        public async Task<ActionResult<List<UserStatus_UserStatusDTO>>> List([FromBody] UserStatus_UserStatusFilterDTO UserStatus_UserStatusFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            UserStatusFilter UserStatusFilter = ConvertFilterDTOToFilterEntity(UserStatus_UserStatusFilterDTO);
            List<UserStatus> UserStatuses = await UserStatusService.List(UserStatusFilter);
            List<UserStatus_UserStatusDTO> UserStatus_UserStatusDTOs = UserStatuses
                .Select(c => new UserStatus_UserStatusDTO(c)).ToList();
            return UserStatus_UserStatusDTOs;
        }


        public UserStatus ConvertDTOToEntity(UserStatus_UserStatusDTO UserStatus_UserStatusDTO)
        {
            UserStatus UserStatus = new UserStatus();
            UserStatus.Id = UserStatus_UserStatusDTO.Id;
            UserStatus.Code = UserStatus_UserStatusDTO.Code;
            UserStatus.Name = UserStatus_UserStatusDTO.Name;
            UserStatus.ApplicationUsers = UserStatus_UserStatusDTO.ApplicationUsers?
                .Select(x => new ApplicationUser
                {
                    Id = x.Id,
                    Username = x.Username,
                    Password = x.Password,
                    DisplayName = x.DisplayName,
                    Email = x.Email,
                    Phone = x.Phone,
                    UserStatusId = x.UserStatusId,
                }).ToList();

            return UserStatus;
        }

        public UserStatusFilter ConvertFilterDTOToFilterEntity(UserStatus_UserStatusFilterDTO UserStatus_UserStatusFilterDTO)
        {
            UserStatusFilter UserStatusFilter = new UserStatusFilter();
            UserStatusFilter.Selects = UserStatusSelect.ALL;
            UserStatusFilter.Skip = UserStatus_UserStatusFilterDTO.Skip;
            UserStatusFilter.Take = UserStatus_UserStatusFilterDTO.Take;
            UserStatusFilter.OrderBy = UserStatus_UserStatusFilterDTO.OrderBy;
            UserStatusFilter.OrderType = UserStatus_UserStatusFilterDTO.OrderType;

            UserStatusFilter.Id = UserStatus_UserStatusFilterDTO.Id;
            UserStatusFilter.Code = UserStatus_UserStatusFilterDTO.Code;
            UserStatusFilter.Name = UserStatus_UserStatusFilterDTO.Name;
            return UserStatusFilter;
        }


    }
}

