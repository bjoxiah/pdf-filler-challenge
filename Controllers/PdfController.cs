using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using DotnetCore.Data;
using DotnetCore.Dto;
using DotnetCore.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Syncfusion.Pdf.Parsing;

namespace DotnetCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IUserRepository _user;
        public PdfController(IUserRepository user) 
        {
            _user = user;
        }

        [HttpGet("applicants")]
        public async Task<IActionResult> FetchApplicantList()
        {
            var applicantList = await _user.FetchApplicants();
            return Ok(applicantList);
        }

        [HttpPost]
        public async Task<IActionResult> SaveApplicant([FromBody] ApplicantDto app) 
        {
            if (!ModelState.IsValid)
                return BadRequest("First name and lastname is required!");

            var file = Path.GetFullPath("formnames.json");
            //Load the PDF document
            var docStream = new StreamReader(file);
            
            var formData = new Dictionary<string, dynamic>();

            string json = docStream.ReadToEnd();
            List<string> listItems = JsonConvert.DeserializeObject<List<string>>(json);
            foreach(var item in listItems) {
                if (item.Contains(".Page1[0]")) {
                    if (item.Contains("Yes_business")) {formData.Add(item, app.Yes_business); continue;}
                    if (item.Contains("No_Business")) {formData.Add(item, app.No_business); continue;}
                    if (item.Contains("Yes_inn")) {formData.Add(item, app.Yes_inn); continue;}
                    if (item.Contains("No_inn")) {formData.Add(item, app.No_inn); continue;}
                    if (item.Contains("txtF_des_part")) {formData.Add(item, app.txtF_des_part); continue;}
                    if (item.Contains("rb_language_written2")) {formData.Add(item, app.rb_language_written2); continue;}
                    if (item.Contains("rb_language_oral2")) {formData.Add(item, app.rb_language_oral2); continue;}
                    if (item.Contains("txtF_Email2")) {formData.Add(item, app.txtF_Email2); continue;}
                    if (item.Contains("txtF_fax_number2")) {formData.Add(item, app.txtF_fax_number2); continue;}
                    if (item.Contains("txtF_alternate_phone2")) {formData.Add(item, app.txtF_alternate_phone2); continue;}
                    if (item.Contains("txtF_phone_number2")) {formData.Add(item, app.txtF_phone_number2); continue;}
                    if (item.Contains("txtF_last_name2")) {formData.Add(item, app.txtF_last_name2); continue;}
                    if (item.Contains("txtF_mid_name2")) {formData.Add(item, app.txtF_mid_name2); continue;}
                    if (item.Contains("txtF_first_name2")) {formData.Add(item, app.txtF_first_name2); continue;}
                    if (item.Contains("rb_language_written")) {formData.Add(item, app.rb_language_written); continue;}
                    if (item.Contains("rb_language_oral")) {formData.Add(item, app.rb_language_oral); continue;}
                    if (item.Contains("txtF_Email")) {formData.Add(item, app.txtF_Email); continue;}
                    if (item.Contains("txtF_fax_number")) {formData.Add(item, app.txtF_fax_number); continue;}
                    if (item.Contains("txtF_alternate_phone")) {formData.Add(item, app.txtF_alternate_phone); continue;}
                    if (item.Contains("txtF_phone_number")) {formData.Add(item, app.txtF_phone_number); continue;}
                    if (item.Contains("txtF_last_name")) {formData.Add(item, app.txtF_last_name); continue;}
                    if (item.Contains("txtF_mid_name")) {formData.Add(item, app.txtF_mid_name); continue;}
                    if (item.Contains("txtF_first_name")) {formData.Add(item, app.txtF_first_name); continue;}
                } else {
                    formData.Add(item, "");
                }
            }
            docStream.Close();

            var applicantInfo = new Applicant {
                FirstName = app.txtF_first_name,
                LastName = app.txtF_last_name,
                FormFormattedData = JsonConvert.SerializeObject(formData),
                UserID = app.User_id,
            };

            await _user.AddApplicant(applicantInfo);

            return Ok();
        }
        
        [HttpGet("getfile")]
        public async Task<IActionResult> GetFile([FromQuery] int applicantID) 
        {
            var applicantInfo = await _user.FetchApplicant(applicantID);

            var formData = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(applicantInfo.FormFormattedData);
            
            var file = Path.GetFullPath("pdf/ESDC-EMP5624-new.pdf");
            //Load the PDF document
            FileStream docStream = new FileStream(file, FileMode.Open, FileAccess.Read);
            PdfLoadedDocument loadedDocument = new PdfLoadedDocument(docStream);
            //Loads the form
            PdfLoadedForm form = loadedDocument.Form;
            //load the check box from field collection
            //Fill the XFA form. 
            form.EnableXfaFormFill = true; 
            var data = new Dictionary<string, dynamic>();
            foreach (PdfLoadedField field in form.Fields) 
            {                
                if (field is PdfLoadedTextBoxField) 
                { 
                    if (formData.ContainsKey(((PdfLoadedTextBoxField)field).Name))
                        ((PdfLoadedTextBoxField)field).Text = formData[((PdfLoadedTextBoxField)field).Name];
                        // Console.WriteLine(formData[((PdfLoadedTextBoxField)field).Name]);
                } 
                if (field is PdfLoadedCheckBoxField) 
                { 
                    // data.Add(((PdfLoadedTextBoxField)field).Name, true);
                    if (formData.ContainsKey(((PdfLoadedCheckBoxField)field).Name))
                        ((PdfLoadedCheckBoxField)field).Checked = ( formData[((PdfLoadedCheckBoxField)field).Name] is bool ) ? formData[((PdfLoadedCheckBoxField)field).Name] : false;
                } 
                if (field is PdfLoadedChoiceField) 
                { 
                    // ((PdfLoadedChoiceField)field).SelectedIndex = new int[] { 0 };
                    if (formData.ContainsKey(((PdfLoadedChoiceField)field).Name))
                        ((PdfLoadedChoiceField)field).SelectedValue = formData[((PdfLoadedChoiceField)field).Name];
                
                }
                if ( field is PdfLoadedRadioButtonListField ) 
                { 
                    // ((PdfLoadedRadioButtonListField)field).SelectedValue = "";
                    if (formData.ContainsKey(((PdfLoadedRadioButtonListField)field).Name))
                        ((PdfLoadedRadioButtonListField)field).SelectedValue = formData[((PdfLoadedRadioButtonListField)field).Name];
                
                }            
            }

            // Flatten the whole form (prevent editing)
            // form.Flatten = true;            

            //Save the PDF document to stream
            MemoryStream stream = new MemoryStream();
            loadedDocument.Save(stream);
            //If the position is not set to '0' then the PDF will be empty.
            stream.Position = 0;
            //Close the document.
            loadedDocument.Close(true);
            //Defining the ContentType for pdf file.
            string contentType = "application/pdf";
            //Define the file name.
            string fileName = "output.pdf";
            //Creates a FileContentResult object by using the file contents, content type, and file name.
            return File(stream, contentType, fileName);
            // return Ok();
        }
    }
}