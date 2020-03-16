using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.role
{
    public class Role_RoleDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Role_ApplicationUserRoleMappingDTO> ApplicationUserRoleMappings { get; set; }
        public List<Role_PermissionDTO> Permissions { get; set; }
        public Role_RoleDTO() {}
        public Role_RoleDTO(Role Role)
        {
            this.Id = Role.Id;
            this.Name = Role.Name;
            this.ApplicationUserRoleMappings = Role.ApplicationUserRoleMappings?.Select(x => new Role_ApplicationUserRoleMappingDTO(x)).ToList();
            this.Permissions = Role.Permissions?.Select(x => new Role_PermissionDTO(x)).ToList();
        }
    }

    public class Role_RoleFilterDTO : FilterDTO
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public RoleOrder OrderBy { get; set; }
    }
}
