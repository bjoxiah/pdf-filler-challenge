using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Parsing;

namespace vanhack_pdf_filler.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post()
        {
            var file = Path.GetFullPath("pdf/ESDC-EMP5624-new.pdf");
            //Load the PDF document
            FileStream docStream = new FileStream(file, FileMode.Open, FileAccess.Read);
            PdfLoadedDocument loadedDocument = new PdfLoadedDocument(docStream);
            //Loads the form
            PdfLoadedForm form = loadedDocument.Form;
            //load the check box from field collection
            PdfLoadedCheckBoxField loadedCheckBoxField = form.Fields[0] as PdfLoadedCheckBoxField;
            // Syncfusion.Pdf.Parsing.
            // Console.WriteLine(form.Fields["EMP5624_E[0].Page1[0].txtF_phone_number[0]"]);
            PdfLoadedTextBoxField phoneNumberField = form.Fields["EMP5624_E[0].Page1[0].txtF_phone_number[0]"] as PdfLoadedTextBoxField;
            phoneNumberField.Text = "23481378653993";

            // random data
            var textEntries = new List<string>();
            //Fill the XFA form. 
            form.EnableXfaFormFill = true; 
            var data = new Dictionary<string, dynamic>();
            foreach (PdfLoadedField field in form.Fields) 
            {                
                if (field is PdfLoadedTextBoxField) 
                { 
                    data.Add(((PdfLoadedTextBoxField)field).Name, "Hello");
                } 
                if (field is PdfLoadedCheckBoxField) 
                { 
                    data.Add(((PdfLoadedTextBoxField)field).Name, true);
                } 
                if (field is PdfLoadedChoiceField) 
                { 
                    // ((PdfLoadedChoiceField)field).SelectedIndex = new int[] { 0 };
                    data.Add(((PdfLoadedTextBoxField)field).Name, 1);
                }
                if ( field is PdfLoadedRadioButtonListField ) 
                { 
                    // ((PdfLoadedRadioButtonListField)field).SelectedValue = "";
                    data.Add(((PdfLoadedTextBoxField)field).Name, true);
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

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
