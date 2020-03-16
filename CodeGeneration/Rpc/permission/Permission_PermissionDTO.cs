using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.permission
{
    public class Permission_PermissionDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long RoleId { get; set; }
        public long ViewId { get; set; }
        public Permission_RoleDTO Role { get; set; }
        public Permission_ViewDTO View { get; set; }
        public List<Permission_PermissionFieldMappingDTO> PermissionFieldMappings { get; set; }
        public List<Permission_PermissionPageMappingDTO> PermissionPageMappings { get; set; }
        public Permission_PermissionDTO() {}
        public Permission_PermissionDTO(Permission Permission)
        {
            this.Id = Permission.Id;
            this.Name = Permission.Name;
            this.RoleId = Permission.RoleId;
            this.ViewId = Permission.ViewId;
            this.Role = Permission.Role == null ? null : new Permission_RoleDTO(Permission.Role);
            this.View = Permission.View == null ? null : new Permission_ViewDTO(Permission.View);
            this.PermissionFieldMappings = Permission.PermissionFieldMappings?.Select(x => new Permission_PermissionFieldMappingDTO(x)).ToList();
            this.PermissionPageMappings = Permission.PermissionPageMappings?.Select(x => new Permission_PermissionPageMappingDTO(x)).ToList();
        }
    }

    public class Permission_PermissionFilterDTO : FilterDTO
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public IdFilter RoleId { get; set; }
        public IdFilter ViewId { get; set; }
        public PermissionOrder OrderBy { get; set; }
    }
}
