using System;
using System.Collections.Generic;

namespace CodeGeneration.Models
{
    public partial class FieldDAO
    {
        public FieldDAO()
        {
            PermissionFieldMappings = new HashSet<PermissionFieldMappingDAO>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public long ViewId { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ViewDAO View { get; set; }
        public virtual ICollection<PermissionFieldMappingDAO> PermissionFieldMappings { get; set; }
    }
}
