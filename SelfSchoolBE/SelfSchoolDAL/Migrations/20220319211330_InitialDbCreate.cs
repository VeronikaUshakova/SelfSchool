using Microsoft.EntityFrameworkCore.Migrations;

namespace SelfSchoolDAL.Migrations
{
    public partial class InitialDbCreate : Migration
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
                    gradeAnswer = table.Column<int>(nullable: false),
                    fileAnswer = table.Column<byte>(nullable: false),
                    fastAnswer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.idAnswer);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    idFamily = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.idFamily);
                });

            migrationBuilder.CreateTable(
                name: "TaskLessons",
                columns: table => new
                {
                    idTask = table.Column<int>(nullable: false),
                    nameTask = table.Column<string>(nullable: false),
                    descriptionTask = table.Column<string>(nullable: false),
                    dateTask = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskLessons", x => x.idTask);
                    table.ForeignKey(
                        name: "FK_TaskLessons_Answers_idTask",
                        column: x => x.idTask,
                        principalTable: "Answers",
                        principalColumn: "idAnswer",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Parents",
                columns: table => new
                {
                    idParent = table.Column<int>(nullable: false),
                    loginParent = table.Column<string>(nullable: false),
                    passwordParent = table.Column<string>(nullable: false),
                    nameParent = table.Column<string>(nullable: false),
                    surnameParent = table.Column<string>(nullable: false),
                    birthdayParent = table.Column<int>(nullable: false),
                    emailParent = table.Column<string>(nullable: false),
                    phoneParent = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parents", x => x.idParent);
                    table.ForeignKey(
                        name: "FK_Parents_Families_idParent",
                        column: x => x.idParent,
                        principalTable: "Families",
                        principalColumn: "idFamily",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pupils",
                columns: table => new
                {
                    idPupil = table.Column<int>(nullable: false),
                    loginPupil = table.Column<string>(nullable: false),
                    passwordPupil = table.Column<string>(nullable: false),
                    namePupil = table.Column<string>(nullable: false),
                    surnamePupil = table.Column<string>(nullable: false),
                    birthdayPupil = table.Column<int>(nullable: false),
                    emailPupil = table.Column<string>(nullable: false),
                    phonePupil = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pupils", x => x.idPupil);
                    table.ForeignKey(
                        name: "FK_Pupils_Answers_idPupil",
                        column: x => x.idPupil,
                        principalTable: "Answers",
                        principalColumn: "idAnswer",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pupils_Families_idPupil",
                        column: x => x.idPupil,
                        principalTable: "Families",
                        principalColumn: "idFamily",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    idLesson = table.Column<int>(nullable: false),
                    nameLesson = table.Column<string>(nullable: false),
                    dateLesson = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.idLesson);
                    table.ForeignKey(
                        name: "FK_Lessons_TaskLessons_idLesson",
                        column: x => x.idLesson,
                        principalTable: "TaskLessons",
                        principalColumn: "idTask",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClassSchools",
                columns: table => new
                {
                    idClass = table.Column<int>(nullable: false),
                    numberClass = table.Column<int>(nullable: false),
                    letterClass = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassSchools", x => x.idClass);
                    table.ForeignKey(
                        name: "FK_ClassSchools_Pupils_idClass",
                        column: x => x.idClass,
                        principalTable: "Pupils",
                        principalColumn: "idPupil",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    idMaterial = table.Column<int>(nullable: false),
                    urlMaterial = table.Column<string>(nullable: true),
                    fileMaterial = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.idMaterial);
                    table.ForeignKey(
                        name: "FK_Materials_Lessons_idMaterial",
                        column: x => x.idMaterial,
                        principalTable: "Lessons",
                        principalColumn: "idLesson",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Materials_TaskLessons_idMaterial",
                        column: x => x.idMaterial,
                        principalTable: "TaskLessons",
                        principalColumn: "idTask");
                });

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    idTeacher = table.Column<int>(nullable: false),
                    loginTeacher = table.Column<string>(nullable: false),
                    passwordTeacher = table.Column<string>(nullable: false),
                    nameTeacher = table.Column<string>(nullable: false),
                    surnameTeacher = table.Column<string>(nullable: false),
                    birthdayTeacher = table.Column<int>(nullable: false),
                    emailTeacher = table.Column<string>(nullable: false),
                    phoneTeacher = table.Column<string>(nullable: true),
                    subjectTeacher = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => x.idTeacher);
                    table.ForeignKey(
                        name: "FK_Teachers_ClassSchools_idTeacher",
                        column: x => x.idTeacher,
                        principalTable: "ClassSchools",
                        principalColumn: "idClass",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Teachers_Lessons_idTeacher",
                        column: x => x.idTeacher,
                        principalTable: "Lessons",
                        principalColumn: "idLesson");
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Materials");

            migrationBuilder.DropTable(
                name: "Parents");

            migrationBuilder.DropTable(
                name: "Teachers");

            migrationBuilder.DropTable(
                name: "ClassSchools");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Pupils");

            migrationBuilder.DropTable(
                name: "TaskLessons");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Answers");
        }
    }
}
