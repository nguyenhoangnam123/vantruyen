using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.user_status
{
    public class UserStatus_UserStatusDTO : DataDTO
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public List<UserStatus_ApplicationUserDTO> ApplicationUsers { get; set; }
        public UserStatus_UserStatusDTO() {}
        public UserStatus_UserStatusDTO(UserStatus UserStatus)
        {
            this.Id = UserStatus.Id;
            this.Code = UserStatus.Code;
            this.Name = UserStatus.Name;
            this.ApplicationUsers = UserStatus.ApplicationUsers?.Select(x => new UserStatus_ApplicationUserDTO(x)).ToList();
        }
    }

    public class UserStatus_UserStatusFilterDTO : FilterDTO
    {
        public IdFilter Id { get; set; }
        public StringFilter Code { get; set; }
        public StringFilter Name { get; set; }
        public UserStatusOrder OrderBy { get; set; }
    }
}
