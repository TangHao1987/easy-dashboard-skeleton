import grails.converters.JSON
import org.easydashboard.framework.IIdName

class BootStrap {

    def init = { servletContext ->
        JSON.registerObjectMarshaller(IIdName, { IIdName e -> e.id })
    }
    def destroy = {
    }
}
