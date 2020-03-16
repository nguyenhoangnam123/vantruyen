using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.role
{
    public class Role_ApplicationUserRoleMappingDTO : DataDTO
    {
        public long ApplicationUserId { get; set; }
        public long RoleId { get; set; }
        public Role_ApplicationUserDTO ApplicationUser { get; set; }   
        
        public Role_ApplicationUserRoleMappingDTO() {}
        public Role_ApplicationUserRoleMappingDTO(ApplicationUserRoleMapping ApplicationUserRoleMapping)
        {
            this.ApplicationUserId = ApplicationUserRoleMapping.ApplicationUserId;
            this.RoleId = ApplicationUserRoleMapping.RoleId;
            this.ApplicationUser = ApplicationUserRoleMapping.ApplicationUser == null ? null : new Role_ApplicationUserDTO(ApplicationUserRoleMapping.ApplicationUser);
        }
    }

    public class Role_ApplicationUserRoleMappingFilterDTO : FilterDTO
    {
        
        public IdFilter ApplicationUserId { get; set; }
        
        public IdFilter RoleId { get; set; }
        
        public ApplicationUserRoleMappingOrder OrderBy { get; set; }
    }
}