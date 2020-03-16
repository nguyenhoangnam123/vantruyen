using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.view
{
    public class View_PermissionDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long RoleId { get; set; }
        public long ViewId { get; set; }
        public View_RoleDTO Role { get; set; }   
        
        public View_PermissionDTO() {}
        public View_PermissionDTO(Permission Permission)
        {
            this.Id = Permission.Id;
            this.Name = Permission.Name;
            this.RoleId = Permission.RoleId;
            this.ViewId = Permission.ViewId;
            this.Role = Permission.Role == null ? null : new View_RoleDTO(Permission.Role);
        }
    }

    public class View_PermissionFilterDTO : FilterDTO
    {
        
        public IdFilter Id { get; set; }
        
        public StringFilter Name { get; set; }
        
        public IdFilter RoleId { get; set; }
        
        public IdFilter ViewId { get; set; }
        
        public PermissionOrder OrderBy { get; set; }
    }
}