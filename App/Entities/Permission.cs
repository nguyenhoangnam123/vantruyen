using System;
using System.Collections.Generic;
using Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Portal.BE.Entities
{
    public class Permission : DataEntity,  IEquatable<Permission>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long RoleId { get; set; }
        public long ViewId { get; set; }
        public Role Role { get; set; }
        public View View { get; set; }
        public List<PermissionFieldMapping> PermissionFieldMappings { get; set; }
        public List<PermissionPageMapping> PermissionPageMappings { get; set; }

        public bool Equals(Permission other)
        {
            return other != null && Id == other.Id;
        }
        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }

    public class PermissionFilter : FilterEntity
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public IdFilter RoleId { get; set; }
        public IdFilter ViewId { get; set; }
        public List<PermissionFilter> OrFilter { get; set; }
        public PermissionOrder OrderBy {get; set;}
        public PermissionSelect Selects {get; set;}
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum PermissionOrder
    {
        Id = 0,
        Name = 1,
        Role = 2,
        View = 3,
    }

    [Flags]
    public enum PermissionSelect:long
    {
        ALL = E.ALL,
        Id = E._0,
        Name = E._1,
        Role = E._2,
        View = E._3,
    }
}
