using System;
using System.Collections.Generic;

namespace Portal.BE.Models
{
    public partial class ApplicationUserDAO
    {
        public ApplicationUserDAO()
        {
            ApplicationUserRoleMappings = new HashSet<ApplicationUserRoleMappingDAO>();
        }

        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long UserStatusId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public virtual UserStatusDAO UserStatus { get; set; }
        public virtual ICollection<ApplicationUserRoleMappingDAO> ApplicationUserRoleMappings { get; set; }
    }
}
