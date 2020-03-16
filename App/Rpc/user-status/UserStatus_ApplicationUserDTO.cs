using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.user_status
{
    public class UserStatus_ApplicationUserDTO : DataDTO
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long UserStatusId { get; set; }
        
        public UserStatus_ApplicationUserDTO() {}
        public UserStatus_ApplicationUserDTO(ApplicationUser ApplicationUser)
        {
            this.Id = ApplicationUser.Id;
            this.Username = ApplicationUser.Username;
            this.Password = ApplicationUser.Password;
            this.DisplayName = ApplicationUser.DisplayName;
            this.Email = ApplicationUser.Email;
            this.Phone = ApplicationUser.Phone;
            this.UserStatusId = ApplicationUser.UserStatusId;
        }
    }

    public class UserStatus_ApplicationUserFilterDTO : FilterDTO
    {
        
        public IdFilter Id { get; set; }
        
        public StringFilter Username { get; set; }
        
        public StringFilter Password { get; set; }
        
        public StringFilter DisplayName { get; set; }
        
        public StringFilter Email { get; set; }
        
        public StringFilter Phone { get; set; }
        
        public IdFilter UserStatusId { get; set; }
        
        public ApplicationUserOrder OrderBy { get; set; }
    }
}