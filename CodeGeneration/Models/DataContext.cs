﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CodeGeneration.Models
{
    public partial class DataContext : DbContext
    {
        public virtual DbSet<ApplicationUserDAO> ApplicationUser { get; set; }
        public virtual DbSet<ApplicationUserRoleMappingDAO> ApplicationUserRoleMapping { get; set; }
        public virtual DbSet<FieldDAO> Field { get; set; }
        public virtual DbSet<PageDAO> Page { get; set; }
        public virtual DbSet<PermissionDAO> Permission { get; set; }
        public virtual DbSet<PermissionFieldMappingDAO> PermissionFieldMapping { get; set; }
        public virtual DbSet<PermissionPageMappingDAO> PermissionPageMapping { get; set; }
        public virtual DbSet<ProviderDAO> Provider { get; set; }
        public virtual DbSet<RoleDAO> Role { get; set; }
        public virtual DbSet<SiteDAO> Site { get; set; }
        public virtual DbSet<UserStatusDAO> UserStatus { get; set; }
        public virtual DbSet<ViewDAO> View { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("data source=192.168.20.200;initial catalog=Portal;persist security info=True;user id=sa;password=123@123a;multipleactiveresultsets=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<ApplicationUserDAO>(entity =>
            {
                entity.HasIndex(e => e.UserStatusId);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DeletedAt).HasColumnType("datetime");

                entity.Property(e => e.DisplayName).HasMaxLength(500);

                entity.Property(e => e.Email).HasMaxLength(500);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Phone).HasMaxLength(500);

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.UserStatus)
                    .WithMany(p => p.ApplicationUsers)
                    .HasForeignKey(d => d.UserStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ApplicationUser_UserStatus");
            });

            modelBuilder.Entity<ApplicationUserRoleMappingDAO>(entity =>
            {
                entity.HasKey(e => new { e.ApplicationUserId, e.RoleId })
                    .HasName("PK_UserRoleMapping");

                entity.HasIndex(e => e.RoleId)
                    .HasName("IX_UserRoleMapping_RoleId");

                entity.HasOne(d => d.ApplicationUser)
                    .WithMany(p => p.ApplicationUserRoleMappings)
                    .HasForeignKey(d => d.ApplicationUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRoleMapping_ApplicationUser");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.ApplicationUserRoleMappings)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRoleMapping_Role");
            });

            modelBuilder.Entity<FieldDAO>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.View)
                    .WithMany(p => p.Fields)
                    .HasForeignKey(d => d.ViewId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionField_View");
            });

            modelBuilder.Entity<PageDAO>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Path)
                    .IsRequired()
                    .HasMaxLength(3000);

                entity.HasOne(d => d.View)
                    .WithMany(p => p.Pages)
                    .HasForeignKey(d => d.ViewId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Page_View");
            });

            modelBuilder.Entity<PermissionDAO>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Permissions)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Permission_Role");

                entity.HasOne(d => d.View)
                    .WithMany(p => p.Permissions)
                    .HasForeignKey(d => d.ViewId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Permission_View");
            });

            modelBuilder.Entity<PermissionFieldMappingDAO>(entity =>
            {
                entity.HasKey(e => new { e.PermissionId, e.FieldId })
                    .HasName("PK_PermissionData");

                entity.HasIndex(e => e.PermissionId)
                    .HasName("IX_PermissionData_PermissionId");

                entity.Property(e => e.Value).HasMaxLength(3000);

                entity.HasOne(d => d.Field)
                    .WithMany(p => p.PermissionFieldMappings)
                    .HasForeignKey(d => d.FieldId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionData_PermissionField");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.PermissionFieldMappings)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionData_Permission");
            });

            modelBuilder.Entity<PermissionPageMappingDAO>(entity =>
            {
                entity.HasKey(e => new { e.PermissionId, e.PageId })
                    .HasName("PK_PermissionAction");

                entity.HasIndex(e => e.PageId);

                entity.HasOne(d => d.Page)
                    .WithMany(p => p.PermissionPageMappings)
                    .HasForeignKey(d => d.PageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionPageMapping_Page");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.PermissionPageMappings)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PermissionAction_Permission");
            });

            modelBuilder.Entity<ProviderDAO>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ADIP).HasMaxLength(500);

                entity.Property(e => e.ADPassword).HasMaxLength(500);

                entity.Property(e => e.ADUsername).HasMaxLength(500);

                entity.Property(e => e.GoogleClient).HasMaxLength(500);

                entity.Property(e => e.GoogleClientSecret).HasMaxLength(500);

                entity.Property(e => e.GoogleRedirectUri).HasMaxLength(3000);

                entity.Property(e => e.MicrosoftClient).HasMaxLength(500);

                entity.Property(e => e.MicrosoftClientSecret).HasMaxLength(500);

                entity.Property(e => e.MicrosoftRedirectUri).HasMaxLength(3000);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<RoleDAO>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(500);
            });

            modelBuilder.Entity<SiteDAO>(entity =>
            {
                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DeletedAt).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.URL)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserStatusDAO>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<ViewDAO>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(3000);

                entity.Property(e => e.Path).HasMaxLength(3000);
            });

            OnModelCreatingExt(modelBuilder);
        }

        partial void OnModelCreatingExt(ModelBuilder modelBuilder);
    }
}
