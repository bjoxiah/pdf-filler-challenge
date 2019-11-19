using System.ComponentModel.DataAnnotations;

namespace DotnetCore.Dto
{
    public class ApplicantDto
    {
        public int User_id {get; set;}
        public bool Yes_business {get; set;}
        public bool No_business {get; set;}
        public bool Yes_inn {get; set;}
        public bool No_inn {get; set;}
        public string txtF_des_part { get; set; }
        [Required]
        public string txtF_first_name { get; set; }
        public string txtF_mid_name { get; set; }
        [Required]
        public string txtF_last_name { get; set; }
        public string txtF_phone_number { get; set; }
        public string txtF_alternate_phone { get; set; }
        public string txtF_fax_number { get; set; }
        public string txtF_Email { get; set; }
        public string rb_language_oral { get; set; }
        public string rb_language_written { get; set; }
        public string txtF_first_name2 { get; set; }
        public string txtF_mid_name2 { get; set; }
        public string txtF_last_name2 { get; set; }
        public string txtF_phone_number2 { get; set; }
        public string txtF_alternate_phone2 { get; set; }
        public string txtF_fax_number2 { get; set; }
        public string txtF_Email2 { get; set; }
        public string rb_language_oral2 { get; set; }
        public string rb_language_written2 { get; set; }
    }
}