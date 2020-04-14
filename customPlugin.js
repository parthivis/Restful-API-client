(function( $ ) {
 
    $.fn.updateTabContent = function(tabName) {
 
        this.filter( "a" ).append(function() {
            return " (" + this.href + ")";
        });
 
        return this;
 
    };
 
}( jQuery ));