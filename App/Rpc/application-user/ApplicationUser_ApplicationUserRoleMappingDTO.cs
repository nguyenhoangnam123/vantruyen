using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.application_user
{
    public class ApplicationUser_ApplicationUserRoleMappingDTO : DataDTO
    {
        public long ApplicationUserId { get; set; }
        public long RoleId { get; set; }
        public ApplicationUser_RoleDTO Role { get; set; }   
        
        public ApplicationUser_ApplicationUserRoleMappingDTO() {}
        public ApplicationUser_ApplicationUserRoleMappingDTO(ApplicationUserRoleMapping ApplicationUserRoleMapping)
        {
            this.ApplicationUserId = ApplicationUserRoleMapping.ApplicationUserId;
            this.RoleId = ApplicationUserRoleMapping.RoleId;
            this.Role = ApplicationUserRoleMapping.Role == null ? null : new ApplicationUser_RoleDTO(ApplicationUserRoleMapping.Role);
        }
    }

    public class ApplicationUser_ApplicationUserRoleMappingFilterDTO : FilterDTO
    {
        
        public IdFilter ApplicationUserId { get; set; }
        
        public IdFilter RoleId { get; set; }
        
        public ApplicationUserRoleMappingOrder OrderBy { get; set; }
    }
}