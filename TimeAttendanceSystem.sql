USE [TimeAttendanceSystem]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeID] [uniqueidentifier] NOT NULL,
	[Fullname] [nvarchar](100) NOT NULL,
	[Birthday] [date] NOT NULL,
	[Gender] [nvarchar](4) NOT NULL,
	[PhoneNumber] [varchar](11) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
	[LastUpdatedAt] [datetime] NULL,
	[LastUpdatedBy] [nvarchar](100) NULL,
 CONSTRAINT [employee_employeeid_primary] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[MenuID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Tooltip] [nvarchar](100) NOT NULL,
	[Url] [text] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[LastUpdatedAt] [datetime] NULL,
	[LastUpdatedBy] [nvarchar](100) NULL,
 CONSTRAINT [menu_menuid_primary] PRIMARY KEY CLUSTERED 
(
	[MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payroll]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payroll](
	[PayRollID] [int] IDENTITY(1,1) NOT NULL,
	[Position] [nvarchar](20) NOT NULL,
	[BasicSalary] [money] NOT NULL,
	[EmployeeID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [payroll_payrollid_primary] PRIMARY KEY CLUSTERED 
(
	[PayRollID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Report]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Report](
	[ReportID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Description] [text] NULL,
	[EmployeeID] [uniqueidentifier] NOT NULL,
	[GrossPay] [money] NOT NULL,
	[PaidStatus] [nvarchar](20) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[LastUpdatedAt] [datetime] NULL,
	[LastUpdatedBy] [nvarchar](100) NULL,
 CONSTRAINT [report_reportid_primary] PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Description] [text] NULL,
 CONSTRAINT [role_roleid_primary] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoleMenu]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleMenu](
	[MenuID] [int] NOT NULL,
	[RoleID] [int] NOT NULL,
 CONSTRAINT [PK_RoleMenu] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC,
	[MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[ScheduleID] [uniqueidentifier] NOT NULL,
	[Shift] [nvarchar](20) NOT NULL,
	[TimeIn] [time](7) NOT NULL,
	[TimeOut] [time](7) NOT NULL,
	[WorkDate] [date] NOT NULL,
	[Description] [ntext] NULL,
	[EmployeeID] [uniqueidentifier] NOT NULL,
	[TotalWorkHours] [decimal](8, 2) NOT NULL,
	[Status] [nvarchar](20) NOT NULL,
	[ViolationID] [int] NULL,
	[ApprovedAt] [datetime] NULL,
	[ApprovedBy] [nvarchar](100) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CreatedBy] [nvarchar](100) NOT NULL,
 CONSTRAINT [schedule_scheduleid_primary] PRIMARY KEY CLUSTERED 
(
	[ScheduleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TbUser]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TbUser](
	[UserID] [uniqueidentifier] NOT NULL,
	[Fullname] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[Password] [text] NOT NULL,
	[EmployeeID] [uniqueidentifier] NULL,
	[LastLoggedIn] [datetime] NULL,
	[CreatedAt] [datetime] NOT NULL,
	[LastUpdatedAt] [datetime] NULL,
	[IsManager] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [user_userid_primary] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRole]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRole](
	[UserID] [uniqueidentifier] NOT NULL,
	[RoleID] [int] NOT NULL,
 CONSTRAINT [PK_UserRole_1] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Violation]    Script Date: 7/28/2023 2:55:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Violation](
	[ViolationID] [int] IDENTITY(1,1) NOT NULL,
	[TypeOfViolation] [nvarchar](50) NOT NULL,
	[AmountDeducted] [money] NOT NULL,
 CONSTRAINT [violation_violationid_primary] PRIMARY KEY CLUSTERED 
(
	[ViolationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Employee] ([EmployeeID], [Fullname], [Birthday], [Gender], [PhoneNumber], [CreatedAt], [CreatedBy], [LastUpdatedAt], [LastUpdatedBy]) VALUES (N'ff6b30f4-056a-44c4-a482-5355aa2b4963', N'Nguyễn Văn A', CAST(N'2023-07-05' AS Date), N'Nam', N'0123456789', CAST(N'2023-07-26T07:04:26.327' AS DateTime), N'Super Admin', CAST(N'2023-07-26T07:13:05.050' AS DateTime), N'Super Admin')
GO
SET IDENTITY_INSERT [dbo].[Menu] ON 

INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (2, N'Nhân viên', N'qlnv', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (3, N'Lịch làm việc', N'llv', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (4, N'Dashboard', N'db', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (5, N'Báo cáo', N'bc', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (6, N'Quản lý phân quyền', N'qlpq', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (7, N'Cấu trúc menu', N'ctm', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Menu] ([MenuID], [Title], [Tooltip], [Url], [IsActive], [CreatedAt], [LastUpdatedAt], [LastUpdatedBy]) VALUES (8, N'Công cụ', N'cc', N'https://www.facebook.com/', 1, CAST(N'2023-07-25T00:00:00.000' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Menu] OFF
GO
SET IDENTITY_INSERT [dbo].[Payroll] ON 

INSERT [dbo].[Payroll] ([PayRollID], [Position], [BasicSalary], [EmployeeID]) VALUES (2, N'HR', 35000000.0000, N'ff6b30f4-056a-44c4-a482-5355aa2b4963')
SET IDENTITY_INSERT [dbo].[Payroll] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleID], [Name], [Description]) VALUES (1, N'Administrator', NULL)
INSERT [dbo].[Role] ([RoleID], [Name], [Description]) VALUES (2, N'Manager', NULL)
INSERT [dbo].[Role] ([RoleID], [Name], [Description]) VALUES (3, N'Employee', NULL)
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (2, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (3, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (4, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (5, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (6, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (7, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (8, 1)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (2, 2)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (3, 2)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (5, 2)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (8, 2)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (2, 3)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (3, 3)
INSERT [dbo].[RoleMenu] ([MenuID], [RoleID]) VALUES (8, 3)
GO
INSERT [dbo].[Schedule] ([ScheduleID], [Shift], [TimeIn], [TimeOut], [WorkDate], [Description], [EmployeeID], [TotalWorkHours], [Status], [ViolationID], [ApprovedAt], [ApprovedBy], [CreatedAt], [CreatedBy]) VALUES (N'2cdec89b-cde4-401b-b498-594cfaace1c6', N'Ca sáng', CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(N'2023-07-28' AS Date), N'asdas', N'ff6b30f4-056a-44c4-a482-5355aa2b4963', CAST(0.00 AS Decimal(8, 2)), N'Đang chờ', NULL, NULL, NULL, CAST(N'2023-07-27T08:06:43.413' AS DateTime), N'Super Admin')
GO
INSERT [dbo].[TbUser] ([UserID], [Fullname], [Email], [Password], [EmployeeID], [LastLoggedIn], [CreatedAt], [LastUpdatedAt], [IsManager], [IsActive]) VALUES (N'1fa4e3c0-34a2-4029-ae02-029534155474', N'Nguyễn Văn A', N'aemp@gmail.com', N'$2a$11$eqeAn/D1su2wUYZ30wNzTu5.eXIXa1ohsMpxfJlUiNlZ6no7.vpIq', N'ff6b30f4-056a-44c4-a482-5355aa2b4963', NULL, CAST(N'2023-07-26T07:04:26.327' AS DateTime), NULL, 0, 1)
INSERT [dbo].[TbUser] ([UserID], [Fullname], [Email], [Password], [EmployeeID], [LastLoggedIn], [CreatedAt], [LastUpdatedAt], [IsManager], [IsActive]) VALUES (N'ba232390-40bc-4f62-8e13-3564e3707189', N'Super Admin', N'admin@gmail.com', N'$2a$11$fAZht9E.uVW9d9BTVK.jAOw4roMqnHlpUVamyy7m4MkpfoWnPnSDK', NULL, CAST(N'2023-07-28T09:19:04.663' AS DateTime), CAST(N'2023-07-25T10:02:40.367' AS DateTime), NULL, 1, 1)
INSERT [dbo].[TbUser] ([UserID], [Fullname], [Email], [Password], [EmployeeID], [LastLoggedIn], [CreatedAt], [LastUpdatedAt], [IsManager], [IsActive]) VALUES (N'd92fc5dd-e160-477a-b95b-d23cbeffbd95', N'aaa', N'a@gmail.com', N'$2a$11$BfRdsA/QPj8poxYTJOJ6oOaUH7fPmBSPF4ZGrmjHoBDFWRcxmQdd.', NULL, CAST(N'2023-07-25T17:04:31.593' AS DateTime), CAST(N'2023-07-25T04:01:31.400' AS DateTime), NULL, 1, 1)
GO
INSERT [dbo].[UserRole] ([UserID], [RoleID]) VALUES (N'1fa4e3c0-34a2-4029-ae02-029534155474', 3)
INSERT [dbo].[UserRole] ([UserID], [RoleID]) VALUES (N'ba232390-40bc-4f62-8e13-3564e3707189', 1)
INSERT [dbo].[UserRole] ([UserID], [RoleID]) VALUES (N'ba232390-40bc-4f62-8e13-3564e3707189', 2)
INSERT [dbo].[UserRole] ([UserID], [RoleID]) VALUES (N'd92fc5dd-e160-477a-b95b-d23cbeffbd95', 3)
GO
SET IDENTITY_INSERT [dbo].[Violation] ON 

INSERT [dbo].[Violation] ([ViolationID], [TypeOfViolation], [AmountDeducted]) VALUES (2, N'Đi trễ', 10000.0000)
SET IDENTITY_INSERT [dbo].[Violation] OFF
GO
ALTER TABLE [dbo].[Payroll]  WITH CHECK ADD  CONSTRAINT [FK_Payroll_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Payroll] CHECK CONSTRAINT [FK_Payroll_Employee]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_Employee]
GO
ALTER TABLE [dbo].[RoleMenu]  WITH CHECK ADD  CONSTRAINT [FK_RoleMenu_Menu] FOREIGN KEY([MenuID])
REFERENCES [dbo].[Menu] ([MenuID])
GO
ALTER TABLE [dbo].[RoleMenu] CHECK CONSTRAINT [FK_RoleMenu_Menu]
GO
ALTER TABLE [dbo].[RoleMenu]  WITH CHECK ADD  CONSTRAINT [FK_RoleMenu_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[RoleMenu] CHECK CONSTRAINT [FK_RoleMenu_Role]
GO
ALTER TABLE [dbo].[Schedule]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employee] ([EmployeeID])
GO
ALTER TABLE [dbo].[Schedule] CHECK CONSTRAINT [FK_Schedule_Employee]
GO
ALTER TABLE [dbo].[Schedule]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Violation] FOREIGN KEY([ViolationID])
REFERENCES [dbo].[Violation] ([ViolationID])
GO
ALTER TABLE [dbo].[Schedule] CHECK CONSTRAINT [FK_Schedule_Violation]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_Role]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_TbUser] FOREIGN KEY([UserID])
REFERENCES [dbo].[TbUser] ([UserID])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_TbUser]
GO
