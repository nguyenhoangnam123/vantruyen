using System;
using System.Collections.Generic;
using Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Portal.BE.Entities
{
    public class ApplicationUser : DataEntity,  IEquatable<ApplicationUser>
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long UserStatusId { get; set; }
        public UserStatus UserStatus { get; set; }
        public List<ApplicationUserRoleMapping> ApplicationUserRoleMappings { get; set; }

        public bool Equals(ApplicationUser other)
        {
            return other != null && Id == other.Id;
        }
        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }

    public class ApplicationUserFilter : FilterEntity
    {
        public IdFilter Id { get; set; }
        public StringFilter Username { get; set; }
        public StringFilter Password { get; set; }
        public StringFilter DisplayName { get; set; }
        public StringFilter Email { get; set; }
        public StringFilter Phone { get; set; }
        public IdFilter UserStatusId { get; set; }
        public List<ApplicationUserFilter> OrFilter { get; set; }
        public ApplicationUserOrder OrderBy {get; set;}
        public ApplicationUserSelect Selects {get; set;}
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum ApplicationUserOrder
    {
        Id = 0,
        Username = 1,
        Password = 2,
        DisplayName = 3,
        Email = 4,
        Phone = 5,
        UserStatus = 6,
    }

    [Flags]
    public enum ApplicationUserSelect:long
    {
        ALL = E.ALL,
        Id = E._0,
        Username = E._1,
        Password = E._2,
        DisplayName = E._3,
        Email = E._4,
        Phone = E._5,
        UserStatus = E._6,
    }
}
