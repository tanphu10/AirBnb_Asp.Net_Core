using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.SeedWorks.Constansts
{
    public static class Permissions
    {
        public static class Dashboard
        {
            [Description("Xem dashboard")]
            public const string View = "Permissions.Dashboard.View";
        }
        public static class Roles
        {
            [Description("Xem quyền")]
            public const string View = "Permissions.Roles.View";
            [Description("Tạo mới quyền")]
            public const string Create = "Permissions.Roles.Create";
            [Description("Sửa quyền")]
            public const string Edit = "Permissions.Roles.Edit";
            [Description("Xóa quyền")]
            public const string Delete = "Permissions.Roles.Delete";
        }
        public static class Users
        {
            [Description("Xem người dùng")]
            public const string View = "Permissions.Users.View";
            [Description("Tạo người dùng")]
            public const string Create = "Permissions.Users.Create";
            [Description("Sửa người dùng")]
            public const string Edit = "Permissions.Users.Edit";
            [Description("Xóa người dùng")]
            public const string Delete = "Permissions.Users.Delete";
        }
        public static class RoomCategories
        {
            [Description("Xem danh mục phòng ")]
            public const string View = "Permissions.RoomCategories.View";
            [Description("Tạo danh mục phòng")]
            public const string Create = "Permissions.RoomCategories.Create";
            [Description("Sửa danh mục phòng")]
            public const string Edit = "Permissions.RoomCategories.Edit";
            [Description("Xóa danh mục phòng")]
            public const string Delete = "Permissions.RoomCategories.Delete";
        }
        public static class Rooms
        {
            [Description("Xem phòng")]
            public const string View = "Permissions.Rooms.View";
            [Description("Tạo phòng")]
            public const string Create = "Permissions.Rooms.Create";
            [Description("Sửa phòng")]
            public const string Edit = "Permissions.Rooms.Edit";
            [Description("Xóa phòng")]
            public const string Delete = "Permissions.Rooms.Delete";
            [Description("Duyệt phòng")]
            public const string Approve = "Permissions.Rooms.Approve";
        }

        public static class Series
        {
            [Description("Xem loạt bài")]
            public const string View = "Permissions.Series.View";
            [Description("Tạo loạt bài")]
            public const string Create = "Permissions.Series.Create";
            [Description("Sửa loạt bài")]
            public const string Edit = "Permissions.Series.Edit";
            [Description("Xóa loạt bài")]
            public const string Delete = "Permissions.Series.Delete";
        }
        public static class Comments
        {
            [Description("Xem comments")]
            public const string View = "Permissions.Comments.View";
            [Description("Tạo comments")]
            public const string Create = "Permissions.Comments.Create";
            [Description("Sửa comments")]
            public const string Edit = "Permissions.Comments.Edit";
            [Description("Xóa comments")]
            public const string Delete = "Permissions.Comments.Delete";
        }
        public static class BookRooms
        {
            [Description("Xem đặt phòng")]
            public const string View = "Permissions.BookRooms.View";
            [Description("Tạo đặt phòng")]
            public const string Create = "Permissions.BookRooms.Create";
            [Description("Sửa đặt phòng")]
            public const string Edit = "Permissions.BookRooms.Edit";
            [Description("Xóa đặt phòng")]
            public const string Delete = "Permissions.BookRooms.Delete";
        }
        public static class Locations
        {
            [Description("Xem vị trí")]
            public const string View = "Permissions.Locations.View";
            [Description("Tạo vị trí")]
            public const string Create = "Permissions.Locations.Create";
            [Description("Sửa vị trí")]
            public const string Edit = "Permissions.Locations.Edit";
            [Description("Xóa vị trí")]
            public const string Delete = "Permissions.Locations.Delete";
        }
        public static class RoomPay
        {
            [Description("Xem Thanh Toán Phòng")]
            public const string View = "Permissions.RoomPay.View";
            [Description("Trả Tiền Phòng")]
            public const string Pay = "Permissions.RoomPay.Pay";

        }
    }
}
