using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    public class HomeController : Controller
    {
        public static List<Lookup> lookup = new List<Lookup>() { new Lookup() { Id = 1, Key = "1", Value = "V1" },
                                                            new Lookup() { Id = 2, Key = "2", Value = "V2" } };
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetIndex()
        {
            return Json(lookup, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Create(Lookup lookup)
        {
            lookup.Id = HomeController.lookup.Max(x => x.Id) + 1;
            HomeController.lookup.Add(lookup);

            return Json(lookup.Id);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Edit(Lookup lookup)
        {
            HomeController.lookup.Find(x => x.Id == lookup.Id).Key = lookup.Key;
            HomeController.lookup.Find(x => x.Id == lookup.Id).Value = lookup.Value;

            return Json(lookup.Id);
        }

        [HttpPost]
        public ActionResult Remove(Lookup lookup)
        {
            HomeController.lookup.RemoveAt(lookup.Id);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }








        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}