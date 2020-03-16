using System;
using System.Collections.Generic;

namespace CodeGeneration.Models
{
    public partial class PermissionDAO
    {
        public PermissionDAO()
        {
            PermissionFieldMappings = new HashSet<PermissionFieldMappingDAO>();
            PermissionPageMappings = new HashSet<PermissionPageMappingDAO>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long RoleId { get; set; }
        public long ViewId { get; set; }

        public virtual RoleDAO Role { get; set; }
        public virtual ViewDAO View { get; set; }
        public virtual ICollection<PermissionFieldMappingDAO> PermissionFieldMappings { get; set; }
        public virtual ICollection<PermissionPageMappingDAO> PermissionPageMappings { get; set; }
    }
}
