module Jekyll
  
  class LessJsGenerator < Generator
    safe true
    priority :low
    
    def generate(site)
      src_root = site.config['source']
      dest_root = site.config['destination']
      less_ext = /\.less$/i
      lessc_bin = site.config['lessc'] or 'lessc'
      
      # static_files have already been filtered against excludes, etc.
      site.static_files.each do |sf|
        next if not sf.path =~ less_ext
        
        less_path = sf.path
        css_path = less_path.gsub(less_ext, '.css').gsub(src_root, dest_root)
        
        FileUtils.mkdir_p(File.dirname(css_path))

        begin
          command = [lessc_bin, 
                     less_path, 
                     css_path
                     ].join(' ')
          puts 'Compiling LESS: ' + command
          `#{command}`
          raise "LESS compilation error" if $?.to_i != 0
        end
      end
    end
    
  end
end