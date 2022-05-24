using Microsoft.EntityFrameworkCore.Migrations;

namespace SelfSchoolDAL.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    idAdmin = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    login = table.Column<string>(nullable: false),
                    password = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.idAdmin);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    idAnswer = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idPupil = table.Column<int>(nullable: false),
                    idTask = table.Column<int>(nullable: false),
                    gradeAnswer = table.Column<int>(nullable: false),
                    fileAnswer = table.Column<byte>(nullable: false),
                    fastAnswer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.idAnswer);
                });

            migrationBuilder.CreateTable(
                name: "ClassSchools",
                columns: table => new
                {
                    idClass = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    numberClass = table.Column<int>(nullable: false),
                    letterClass = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassSchools", x => x.idClass);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    idFamily = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idParent = table.Column<int>(nullable: false),
                    idPupil = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.idFamily);
                });

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    idLesson = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nameLesson = table.Column<string>(nullable: false),
                    idTeacher = table.Column<int>(nullable: false),
                    dateLesson = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.idLesson);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    idMaterial = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    urlMaterial = table.Column<string>(nullable: true),
                    fileMaterial = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.idMaterial);
                });

            migrationBuilder.CreateTable(
                name: "Parents",
                columns: table => new
                {
                    idParent = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    loginParent = table.Column<string>(nullable: false),
                    passwordParent = table.Column<string>(nullable: false),
                    nameParent = table.Column<string>(nullable: false),
                    surnameParent = table.Column<string>(nullable: false),
                    birthdayParent = table.Column<long>(nullable: false),
                    emailParent = table.Column<string>(nullable: false),
                    phoneParent = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parents", x => x.idParent);
                });

            migrationBuilder.CreateTable(
                name: "Pupils",
                columns: table => new
                {
                    idPupil = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    loginPupil = table.Column<string>(nullable: false),
                    passwordPupil = table.Column<string>(nullable: false),
                    namePupil = table.Column<string>(nullable: false),
                    surnamePupil = table.Column<string>(nullable: false),
                    birthdayPupil = table.Column<long>(nullable: false),
                    emailPupil = table.Column<string>(nullable: false),
                    phonePupil = table.Column<string>(nullable: true),
                    idClass = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pupils", x => x.idPupil);
                });

            migrationBuilder.CreateTable(
                name: "TaskLessons",
                columns: table => new
                {
                    idTask = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idLesson = table.Column<int>(nullable: false),
                    nameTask = table.Column<string>(nullable: false),
                    descriptionTask = table.Column<string>(nullable: false),
                    dateTask = table.Column<int>(nullable: false),
                    idMaterial = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskLessons", x => x.idTask);
                });

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    idTeacher = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    loginTeacher = table.Column<string>(nullable: false),
                    passwordTeacher = table.Column<string>(nullable: false),
                    nameTeacher = table.Column<string>(nullable: false),
                    surnameTeacher = table.Column<string>(nullable: false),
                    birthdayTeacher = table.Column<long>(nullable: false),
                    emailTeacher = table.Column<string>(nullable: false),
                    phoneTeacher = table.Column<string>(nullable: true),
                    subjectTeacher = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => x.idTeacher);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "ClassSchools");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Materials");

            migrationBuilder.DropTable(
                name: "Parents");

            migrationBuilder.DropTable(
                name: "Pupils");

            migrationBuilder.DropTable(
                name: "TaskLessons");

            migrationBuilder.DropTable(
                name: "Teachers");
        }
    }
}
