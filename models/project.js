var Project = module.exports = function (data) {
   this.slug = data.slug;
   this.name = data.name;
   this.href = data.href;
   this.image = data.image;
   this.tagline = data.tagline;
   this.paragraphs = data.paragraphs;
   this.featured = data.featured;

   this.url = "/projects/" + this.slug;
   this.imageUrl = "/projects/" + this.slug + "/" + this.image;
};