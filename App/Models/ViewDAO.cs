using System;
using System.Collections.Generic;

namespace Portal.BE.Models
{
    public partial class ViewDAO
    {
        public ViewDAO()
        {
            Fields = new HashSet<FieldDAO>();
            Pages = new HashSet<PageDAO>();
            Permissions = new HashSet<PermissionDAO>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<FieldDAO> Fields { get; set; }
        public virtual ICollection<PageDAO> Pages { get; set; }
        public virtual ICollection<PermissionDAO> Permissions { get; set; }
    }
}
