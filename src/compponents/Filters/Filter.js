import "./Filter.css";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

export default function Filters({ facets, handleApplyFilters,handleReset}) {
  const [appliedFilters, setAppliedFilters] = useState([]);

  function onSelectionUpdate(selectedItem) {
    const index = appliedFilters.findIndex(
      (item) => item.facetId === selectedItem.facetId
    );

    if (index === -1) {
      setAppliedFilters([
        ...appliedFilters,
        {
          facetId: selectedItem.facetId,
          key : selectedItem.key,
          selections: [selectedItem.filter],
        },
      ]);
    } else {
      const currentSelections = appliedFilters[index].selections;
      const isSelected = currentSelections.find(
        (filter) => filter.id === selectedItem.filter.id
      );

      if (isSelected) {
        const updatedSelections = currentSelections.filter(
          (filter) => filter.id !== selectedItem.filter.id
        );
        setAppliedFilters((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, selections: updatedSelections } : item
          )
        );
      } else {
        setAppliedFilters((prev) =>
          prev.map((item, i) =>
            i === index
              ? {
                  ...item,
                  selections: [...currentSelections, selectedItem.filter],
                }
              : item
          )
        );
      }
    }
  }

  function clearSelections(facetId) {
    setAppliedFilters((prev) => {
      const updatedFilters = prev.filter((filter) => filter.facetId !== facetId);
      handleApplyFilters(updatedFilters);
      return updatedFilters;
    });
  }

  function onApplyFilters() {
    handleApplyFilters(appliedFilters);
  }

  function onReset(){
    setAppliedFilters([])
    handleReset(appliedFilters)
  }
  return (
    <div className="facets-main-container">
      <Card className="facets-container" variant="outlined">
        {facets.map((facet) => {
          return (
            <Card key={facet.id} className="facet--card" variant="unstyled">
              <CardHeader title={facet.label} className="facet--label" />
              <CardContent className="facet--content">
                {facet.multiSelect && (
                  <FormGroup>
                    {facet.filters.map((item) => {
                      return (
                        <FormControlLabel
                          value={item.id}
                          control={
                            <Checkbox
                              checked={
                                appliedFilters
                                  .find((filter) => filter.facetId === facet.id)
                                  ?.selections.some((f) => f.id === item.id) ||
                                false
                              }
                            />
                          }
                          label={item.label}
                          onChange={() =>
                            onSelectionUpdate({
                              facetId: facet.id,
                              key : facet.key,
                              filter: item,
                            })
                          }
                          key={item.id}
                          className="facet--filter-container"
                        />
                      );
                    })}
                  </FormGroup>
                )}
              </CardContent>
              <div className="facet--actions">
                {/* <Button variant="text" color="warning">
                  Show More
                </Button> */}
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => clearSelections(facet.id)}
                  sx={{marginLeft : 'auto'}}
                  disabled={!appliedFilters.find(filter => filter.facetId === facet.id)?.selections.length}                >
                  Clear
                </Button>
              </div>
            </Card>
          );
        })}
      </Card>
      <div className="all-facets--action">
        <Button variant="outlined" color="warning" disabled={!appliedFilters.length} onClick={onReset}>
          Reset
        </Button>
        <Button variant="contained" color="warning" onClick={onApplyFilters} disabled={!appliedFilters.length}>
          Apply
        </Button>
      </div>
    </div>
  );
}
