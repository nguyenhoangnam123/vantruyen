using System;
using System.Collections.Generic;

namespace CodeGeneration.Models
{
    public partial class RoleDAO
    {
        public RoleDAO()
        {
            ApplicationUserRoleMappings = new HashSet<ApplicationUserRoleMappingDAO>();
            Permissions = new HashSet<PermissionDAO>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ApplicationUserRoleMappingDAO> ApplicationUserRoleMappings { get; set; }
        public virtual ICollection<PermissionDAO> Permissions { get; set; }
    }
}
