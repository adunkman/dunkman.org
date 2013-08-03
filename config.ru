require "sinatra"

redirects = {
  "/about.html" => "/about/",

  "/2012/01/14/messaging-using-rabbitmq-socketio.html" => "/code/messaging-using-rabbitmq-socketio.html",
  "/2012/01/10/interesting-talks-at-codemash.html" => "/conferences/interesting-talks-at-codemash.html",
  "/2011/09/30/xmbc-and-hulu.html" => "/articles/xmbc-and-hulu.html",
  "/2010/03/24/disabling-the-mac-os-x-startup-chime.html" => "/articles/disabling-the-mac-os-x-startup-chime.html",

  "/tags/rabbitmq" => "/code/",
  "/tags/socket-io" => "/code/",
  "/tags/code" => "/code/",
  "/tags/node" => "/code/",

  "/tags/codemash" => "/conferences/",
  "/tags/conference" => "/conferences/",

  "/tags/linux" => "/articles/",
  "/tags/xbmc" => "/articles/",
  "/tags/hulu" => "/articles/",
  "/tags/mac-os-x" => "/articles/",

  "*" => "/"
}

redirects.each do |old_url, new_url|
  get old_url do
    redirect "http://www.dunkman.me#{new_url}", 301
  end
end

run Sinatra::Application
