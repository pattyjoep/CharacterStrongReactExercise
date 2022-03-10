import React, { useEffect } from "react"
import {
    Button,
    Center,
    Heading,
    Text,
    Icon,
    Input,
    ScaleFade,
    OrderedList,
    Divider,
    ListItem,
    Spinner,
    InputGroup, // Some Chakra components that might be usefull
    HStack,
    VStack,
    InputRightAddon,
} from "@chakra-ui/react"
import { Card } from '@components/design/Card'
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"
import { Container, Row, Col} from 'react-bootstrap';

const Home: React.FC = () => {
    const [searching, setSearching] = React.useState(false)
    const [districtSearch, setDistrictSearch] = React.useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = React.useState<NCESSchoolFeatureAttributes[]>([]);

    const demo = async (districtValue?: string, schoolValue?: string) => { // see console for api result examples
        setSearching(true)

        const demoDistrictSearch = await searchSchoolDistricts(districtValue)
        setDistrictSearch(demoDistrictSearch)
        console.log("District example", demoDistrictSearch)

    
        const demoSchoolSearch = await searchSchools(schoolValue, demoDistrictSearch[1].LEAID)
        setSchoolSearch(demoSchoolSearch)
        console.log("School Example", demoSchoolSearch)

        setSearching(false)
    }
    const districts = districtSearch
    const districtItems = districts.map((value) => 
        <li>{value.NAME}</li> 
    )

    const schools = schoolSearch 
    const schoolItems = schools.map((value) => 
        <li>{value.NAME}</li> 
    )

    useEffect(() => {
        demo("Peninsula School District", "")
    }, [])

    // const search: HTMLButtonElement = document.getElementsByClassName("search") as HTMLButtonElement
    // search.addEventListener("click", () => {
    //     demo("Peninsula School District", "")
    // })

    return (
        <Center padding="100px" width="100%">
            {/* <ScaleFade initialScale={0.9} in={true}> */}
                <Card variant="rounded" borderColor="#42e794">
                    <Heading>School Data Finder</Heading>
                    <Text>
                        <OrderedList>
                            <ListItem>Search for a district</ListItem>
                             <Input id="districtSearch" placeholder='Search for a district' />
                            <ListItem>Search for a school within the district (or bypass district filter)</ListItem>
                            <Input id="schoolSearch" placeholder='Search for a school' />
                            <ListItem>View all returned data in an organized way</ListItem>
                        </OrderedList>
                        <Button id="search">Search</Button>
                    </Text>
                    <Divider margin={4} />
                    <Text>
                        {searching ? <Spinner /> : <></>}< br />
                        <Container>
                            <Row>
                                <Col>
                                {districtSearch.length} Districts:
                                </Col>
                                <Col>
                                {schoolSearch.length} Schools:
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {districtItems}
                                </Col>
                                <Col>
                                    {schoolItems}
                                </Col>
                            </Row>
                        </Container>
                    </Text>
                </Card>
            {/* </ScaleFade> */}





        </Center>

        
    );
};

export default Home