using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.role
{
    public class Role_PermissionDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long RoleId { get; set; }
        public long ViewId { get; set; }
        public Role_ViewDTO View { get; set; }   
        
        public Role_PermissionDTO() {}
        public Role_PermissionDTO(Permission Permission)
        {
            this.Id = Permission.Id;
            this.Name = Permission.Name;
            this.RoleId = Permission.RoleId;
            this.ViewId = Permission.ViewId;
            this.View = Permission.View == null ? null : new Role_ViewDTO(Permission.View);
        }
    }

    public class Role_PermissionFilterDTO : FilterDTO
    {
        
        public IdFilter Id { get; set; }
        
        public StringFilter Name { get; set; }
        
        public IdFilter RoleId { get; set; }
        
        public IdFilter ViewId { get; set; }
        
        public PermissionOrder OrderBy { get; set; }
    }
}