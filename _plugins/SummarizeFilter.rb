module Jekyll
  module Filters
    def summarize(str, splitstr = /\s*<!-- [Mm]ore -->/)
      str.split(splitstr)[0]
    end
  end
end