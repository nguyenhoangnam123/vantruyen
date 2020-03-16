using System;
using System.Collections.Generic;
using Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Portal.BE.Entities
{
    public class ApplicationUserRoleMapping : DataEntity,  IEquatable<ApplicationUserRoleMapping>
    {
        public long ApplicationUserId { get; set; }
        public long RoleId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Role Role { get; set; }

        public bool Equals(ApplicationUserRoleMapping other)
        {
            return true;
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    public class ApplicationUserRoleMappingFilter : FilterEntity
    {
        public IdFilter ApplicationUserId { get; set; }
        public IdFilter RoleId { get; set; }
        public List<ApplicationUserRoleMappingFilter> OrFilter { get; set; }
        public ApplicationUserRoleMappingOrder OrderBy {get; set;}
        public ApplicationUserRoleMappingSelect Selects {get; set;}
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum ApplicationUserRoleMappingOrder
    {
        ApplicationUser = 0,
        Role = 1,
    }

    [Flags]
    public enum ApplicationUserRoleMappingSelect:long
    {
        ALL = E.ALL,
        ApplicationUser = E._0,
        Role = E._1,
    }
}
