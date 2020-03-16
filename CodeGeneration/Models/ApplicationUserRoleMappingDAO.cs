using System;
using System.Collections.Generic;

namespace CodeGeneration.Models
{
    public partial class ApplicationUserRoleMappingDAO
    {
        public long ApplicationUserId { get; set; }
        public long RoleId { get; set; }

        public virtual ApplicationUserDAO ApplicationUser { get; set; }
        public virtual RoleDAO Role { get; set; }
    }
}
